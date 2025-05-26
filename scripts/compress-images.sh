#!/bin/bash

DIR=$(dirname $0)

echo "Compressing images in $DIR/../public/img"

for ext in png jpg jpeg; do
    for img in $(find "$DIR/../public/img" -type f -name "*.${ext}"); do
        echo "Found image $img"
        magick convert "$img" -resize "1024x768>" "$img"
    done
done
