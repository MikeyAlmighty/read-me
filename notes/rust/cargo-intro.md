# Cargo

## What?

Rust Package Manager

* Packages Dependencies
* Compiles packages
* Make Distributable Packages
* Upload packages to [Crates.io](Crates.io)

## Project File Layout:

* Cargo.lock
* Cargo.toml
* src/
  * Source Code
* benches
  * Benchmarks
* examples
  * Example Code
* tests (integration tests)
  * Integration tests

> Cargo.lock = package-lock.json (Repeatable build, faster tooling)
> Cargo.toml = package.json

> TOML: Tom's Obvious, Minimal, Language [TOML](https://github.com/toml-lang/toml)
Built on **SEMVER**

> Target/debug/deps = node_modules


Top Level has its own Cargo.toml file of project => Workspace, commonly maintained inside of a single workspace.
Workspace share common output directory (target)

Crates.io is where crates can be found, documentation, deps, repo etc.
Cargo tooling understands deps to install from: 
* crates.io
* git links
* path 

Cargo supports multiple sources (registry version AND local version).

**Eg. Cargo.toml:**

```
[dependencies]
rand = "0.7"
num_cpus = "1.0"
num_cpus = { git="https://www.github.com/deadpool/kills" }
```

Cargo does build Optimizations for faster compilation

compiling in --release is optimized for performance (obviously).

Build scripts: Rust has a build.rs at root of project.
Use cases: Build C Libraries, generate Rust Code, set platform-specific config settings, etc.
build.rs is Compiled and Executed before  building the package.

