#!/bin/bash

echo ''
read -p "Deploy contents of build directory to gh-pages? (y/n) " choice
case "$choice" in
  y|Y ) echo "yes";;
  n|N ) exit 0;;
  * ) echo "Invalid answer, please type \"y\" or \"n\"";;
esac

git push origin `git subtree split --prefix build master`:gh-pages --force
