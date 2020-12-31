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

> target/debug/deps = node_modules
