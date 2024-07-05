#!/bin/bash
echo "Cleaning up workspace..."
rm -rf lambda-layers
echo "Creating layer..."
mkdir -p lambda-layers/prisma/nodejs/prisma
echo "Prepare Prisma Query Engine Library lambda layer..."
cp -r node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-3.0.x.so.node lambda-layers/prisma/nodejs/prisma/libquery_engine-linux-arm64-openssl-3.0.x.so.node
