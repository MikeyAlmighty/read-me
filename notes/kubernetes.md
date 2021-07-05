# Kubernetes 

Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.

Kubernetes is highly inspired by the **Google Borg** system.
Written in **Go**
v1.0 released in July 2015

Some of the features/objects of Kubernetes that can be traced back to **Borg**, or to lessons learned from it, are:

- API servers
- Pods
- IP-per-Pod
- Services
- Labels.

Features kubernetes provide:

- Automatic bin packing
  - Kubernetes automatically schedules containers based on resource needs and constraints, to maximize utilization without sacrificing availability.
- Self-healing
  - Kubernetes automatically replaces and reschedules containers from failed nodes. It kills and restarts containers unresponsive to health checks, based on existing rules/policy. It also prevents traffic from being routed to unresponsive containers.
- Horizontal scaling
  - With Kubernetes applications are scaled manually or automatically based on CPU or custom metrics utilization.
- Service discovery and Load balancing
  - Containers receive their own IP addresses from Kubernetes, while it assigns a single Domain Name System (DNS) name to a set of containers to aid in load-balancing requests across the containers of the set.
- Automated rollouts and rollbacks
  - Kubernetes seamlessly rolls out and rolls back application updates and configuration changes, constantly monitoring the application's health to prevent any downtime.
- Secret and configuration management
  - Kubernetes manages sensitive data and configuration details for an application separately from the container image, in order to avoid a re-build of the respective image. Secrets consist of sensitive/confidential information passed to the application without revealing the sensitive content to the stack configuration, like on GitHub.
- Storage orchestration
  - Kubernetes automatically mounts software-defined storage (SDS) solutions to containers from local storage, external cloud providers, distributed storage, or network storage systems.
- Batch execution
  - Kubernetes supports batch execution, long-running jobs, and replaces failed containers.

## 1. Master node

The **master node** provides a running environment for the **control plane** responsible for managing the state of a Kubernetes cluster, and it is the brain behind all operations inside the cluster.

The control plane components are agents with very distinct roles in the cluster's management.
In order to communicate with the Kubernetes cluster, users send requests to the control plane via a Command Line Interface (CLI) tool (Or Web UI Dashboard/API)

It is important to keep the **control plane** running at all costs.

To ensure the control plane's fault tolerance, master node **replicas** can be added to the cluster,
configured in **High-Availability (HA)** mode. While **only one** of the master nodes is dedicated to **actively manage the cluster**, the control plane components stay in **sync across**  the master node ***replicas***.
This type of configuration adds resiliency to the cluster's control plane, should the active master node fail.

**etcd**: a distributed key-value store which only holds cluster state related data, no client workload data.
All cluster configuration data is saved to **etcd**. 

- With **stacked** control plane nodes, where etcd nodes are colocated with control plane nodes
- With **external** etcd nodes, where etcd runs on separate nodes from the control plane

With **stacked etcd** topology, HA master node replicas ensure the etcd data store's resiliency as well. However, that is not the case with **external etcd topology**, where the etcd hosts have to be **separately replicated for HA**, a configuration that introduces the need for additional hardware.

[etcd topologies](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/#stacked-etcd-topology)

**Master Node**
Runs:
- API Server
- Scheduler
- Controller Managers
- Data Store

In addition also runs:
- Container runtime
- Node Agent
- Proxy


### API Server

All the **administrative tasks** are coordinated by the `kube-apiserver`, a central control plane component running on the master node.
During processing the API Server reads the Kubernetes cluster's current state from the etcd data store, and after a call's execution, the resulting state of the Kubernetes cluster is saved in the distributed key-value data store for persistence. The API Server is the only master plane component to talk to the etcd data store, both to read from and to save Kubernetes cluster state information - acting as a middle interface for any other control plane agent inquiring about the cluster's state.

### Scheduler
**kube-scheduler** is to assign new workload objects, such as pods, to nodes.
During the scheduling process, decisions are made based on current Kubernetes cluster state and new object's requirements.
The scheduler obtains data from the etcd data store - via the API Server- resource usage data for each worker node in the cluster.
The scheduler also receives from the API Server the new object's requirements which are part of its configuration data.

Constraints:
1. Predicates = Hard requirements, like 4Gb of memory.
2. Priorities = Soft requirements, like prefer spreading.

When a new pod is not yet assigned a node:
The scheduler takes into account Quality of Service (QoS) requirements, data locality, affinity, anti-affinity, taints, toleration, cluster topology, etc. 
Once all the cluster data is available, the scheduling algorithm **filters the nodes with predicates** to isolate the possible node candidates which **then are scored with priorities** in order to select the one node that satisfies all the requirements for hosting the new workload. The outcome of the decision process is communicated back to the API Server, which then delegates the workload deployment with other control plane agents. 

Scoring: Filter by predicate then scored by priority.

### Controller Manager
Regulates the state of the Kubernetes cluster.
Controllers are watch-loops continuously running and comparing the cluster's **desired state** (provided by objects' configuration data) with its **current state** (obtained from etcd data store via the API server).
In case of a mismatch corrective action is taken in the cluster **until its current state matches the desired state.**

#### Controllers:

- **kube-controller-manager**: Runs controllers responsible to act when nodes become unavailable, to ensure pod counts are as expected, to create endpoints, service accounts, and API access tokens.
- **cloud-controller-manager**: Runs controllers responsible to interact with the underlying infrastructure of a cloud provider when nodes become unavailable, to manage storage volumes when provided by a cloud service, and to manage load balancing and routing.

### Data Store (etcd)
`etcd` is a **strongly consistent**, **distributed** key-value data store used to persist a Kubernetes cluster's state.
New data is written to the data store only by appending to it, data is never replaced in the data store. 
Obsolete data is compacted periodically to minimize the size of the data store.

Out of all the control plane components, **only the API Server is able to communicate with the etcd data store**.

etcd's CLI management tool - `etcdctl`, provides `backup`, `snapshot`, and `restore capabilities` which come in handy especially for a single etcd instance Kubernetes cluster - common in Development and learning environments. However, in Stage and Production environments, it is extremely important to replicate the data stores in HA mode, for cluster configuration data resiliency.

Some Kubernetes cluster bootstrapping tools, such as **kubeadm**, by default, provision `stacked` etcd master
nodes, where the **data store runs alongside and shares resources with the other control plane 
components on the same master node**.

For data store isolation from the control plane components, the bootstrapping process can be configured for an `external` etcd topology, where the data store is **provisioned on a dedicated separate host**, thus **reducing** the chances of an etcd failure.

- Both stacked and external etcd configurations support HA configurations!

etcd is based on the **Raft Consensus Algorithm** which allows a collection of machines to work as a coherent group that can survive the failures of some of its members.

In Kubernetes, besides storing the cluster state, etcd is also used to store configuration details such as subnets, ConfigMaps, Secrets, etc.


## 2. Worker node
A worker node provides a **running environment for client applications**. 
Though containerized microservices, these applications are encapsulated in Pods,
**controlled** by the **cluster control plane agents running on the master node**.

Pods are **scheduled** on worker nodes, where they find required compute, `memory and storage resources` to run and `networking` to talk to each other and the outside world.
A **Pod** is the `smallest scheduling unit` in Kubernetes.
It is a logical collection of `one or more containers scheduled together`, and the **collection** can be `started, stopped, or rescheduled` as a **single unit** of work. 

**worker node** components:

- Container Runtime
- Node Agent - kubelet
- Proxy - kube-proxy
- Addons for DNS, Dashboard user interface, cluster-level monitoring and logging.

### Container Runtime
In order to manage a container's lifecycle, Kubernetes requires a **container runtime** on the `node where a Pod and its containers are to be scheduled`. 

Example container Runtimes:
- Docker - although a container platform which uses **containerd** as a container runtime, it is the most popular container runtime used with Kubernetes
- CRI-O - a lightweight container runtime for Kubernetes, it also supports Docker image registries
- containerd - a simple and portable container runtime providing robustness
- frakti - a hypervisor-based container runtime for Kubernetes

### Node Agent - kubelet
The kubelet is an agent running on **each** node and **communicates with the control plane components from the master node.**
It receives Pod **definitions**, `primarily from the API Server`, and interacts with the **container runtime** on the node to **run containers associated with the Pod**.
It also **monitors** the **health and resources** of Pods running containers.

The kubelet **connects to container runtimes** though a plugin based interface - the **Container Runtime Interface (CRI)**. The CRI consists of protocol buffers, gRPC API, libraries, and additional specifications and tools that are currently under development. In order to connect to interchangeable container runtimes, kubelet uses a shim application which provides a clear abstraction layer between kubelet and the container runtime. 

kubelet uses a **shim** application which provides a clear **abstraction layer** between **kubelet** and the **container runtime**. 

The CRI implements two services:

- **ImageService** Responsible for all the image-related operations.
- **RuntimeService** Responsible for all the Pod and container-related operations.

Container runtimes used to be hard-coded into kubelet, but since the CRI was introduced, Kubernetes has become more flexible to use different container runtimes without the need to recompile. Any container runtime that implements the `CRI` can be used by Kubernetes to manage **Pods**, **containers**, and **container images**.

**Shims** are CRI implementations, or interfaces, specific to each container runtime supported by Kubernetes. 
Examples:

- DockerShim: Containers are created using `Docker` installed on the worker nodes. Internally, Docker uses containerd to create and manage containers:
- cri-containerd: With `cri-containerd`, we can **directly** use containerd to create and manage containers:

### Proxy - kube-proxy 
The `kube-proxy` is the network agent which runs on each node responsible for `dynamic updates` and `maintenance of all networking rules on the node`.
It **abstracts the details of Pods networking** and **forwards connection requests to Pods**. 

Responsible for **TCP**, **UDP**, and **SCTP stream** `forwarding` or `round-robin forwarding` across a set of Pod backends, and it implements **forwarding rules** `defined by users through Service API objects`.

### Addons
Addons are cluster features and functionality _not yet available in Kubernetes_, therefore implemented through **3rd-party pods and services**.

- **DNS** - cluster DNS is a DNS server required to assign DNS records to Kubernetes objects and resources
- **Dashboard** - a general purposed web-based user interface for cluster management
- **Monitoring** - collects cluster-level container metrics and saves them to a central data store
- **Logging** - collects cluster-level container logs and saves them to a central log store for analysis.

### Networking issues

Decoupled microservices based applications rely heavily on **networking** in order to mimic `the tight-coupling once available in the monolithic era`.
As a containerized microservices orchestrator it needs to address a few distinct networking challenges:

- Container-to-container communication inside Pods.
- Pod-to-Pod communication on the same node and across cluster nodes.
- Pod-to-Service communication within the same namespace and across cluster namespaces.
- External-to-Service communication for clients to access applications in a cluster.

All these networking challenges must be addressed before deploying a Kubernetes cluster.

### Container-to-Container Communication inside pods 
Making use of the `underlying host operating system's kernel virtualization` features, a **container runtime** creates an `isolated network space for each container` it starts.
On Linux, this isolated network space is referred to as a **network namespace.** 
A network namespace can be shared across containers, or with the host operating system.

When a `Pod is started`, a special **Pause** container is initialized by the **Container Runtime** for the sole purpose to create a **network namespace** for the Pod.
i.e:

- **Pause container** => create network namespace for the pod.

All additional containers - created through user requests - running inside the Pod will `share the Pause container's network namespace` so that they can all talk to each other via localhost.

### Pod-to-Pod Communication Across Nodes


The Kubernetes network model aims to reduce complexity, and it treats Pods as **VMs** on a network,
where each VM is equipped with a **network interface** - thus **each Pod receiving a unique IP address**.
This model is called **"IP-per-Pod" and ensures Pod-to-Pod communication**, just as VMs are able to communicate with each other on the same network.

**Containers** share the **Pod's network namespace** and must coordinate ports assignment inside the Pod just as applications would on a VM,
all while being able to **communicate with each other on localhost - inside the Pod**. 

**Containers** are `integrated with the overall Kubernetes networking model` through the use of the **Container Network Interface (CNI)** supported by **CNI plugins**.

> CNI is a set of a specification and libraries which allow plugins to configure the networking for containers.

While there are a few core plugins, most **CNI plugins** are `3rd-party Software Defined Networking (SDN)` solutions implementing the **Kubernetes networking model**.

The **container runtime** offloads the `IP assignment` to **CNI**, which connects to the underlying **configured plugin**, such as `Bridge` or `MACvlan` to get the IP address.

Once the IP address is given by the respective plugin, CNI forwards it back to the requested **container runtime**. 

### Pod-to-External World communication
Kubernetes enables external accessibility through **Services**, `complex encapsulations of network routing rule definitions` **stored in iptables** on **cluster nodes** and implemented by **kube-proxy agents**.

By exposing services to the external world with the aid of kube-proxy, applications become accessible from outside the cluster over a virtual IP address.
