#!/bin/bash
# This is a script used by the devcontainer to build the project

# install dependencies
yarn install

# Build Server Dependencies
yarn blank @blank/server-native build

# Create database
yarn blank @blank/server prisma migrate reset -f
