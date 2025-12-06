#!/bin/bash

# Get the list of modified and untracked files
files=$(git status --porcelain | grep '^[ ?MDAU]' | awk '{print $2}')

for file in $files; do
  # Skip deleted files (D)
  if [ ! -f "$file" ]; then
    continue
  fi


  git add "$file"


  git commit -m "feat: $file"
done


git push