---
title: Copy all files with extension keeping folder structure
description: A shell one-liner to copy matching files while preserving nested folders.
date: 2025-02-17
tags: [shell, linux, files, automation]
---
For example, if we want to copy all `application.properties` files nested in all folders while keeping the original folder structure:
```sh
find . -type f -wholename '*src/main/resources/application.properties' -exec sh -c 'd="newDir/${1%/*}"; mkdir -p "$d" && cp "$1" "$d"' sh {} \;
```
