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
- Data Store.

In addition also runs:
- Container runtime
- Node Agent
- Proxy


## API Server

All the **administrative tasks** are coordinated by the `kube-apiserver`, a central control plane component running on the master node.
During processing the API Server reads the Kubernetes cluster's current state from the etcd data store, and after a call's execution, the resulting state of the Kubernetes cluster is saved in the distributed key-value data store for persistence. The API Server is the only master plane component to talk to the etcd data store, both to read from and to save Kubernetes cluster state information - acting as a middle interface for any other control plane agent inquiring about the cluster's state.

## Scheduler
