#!/usr/bin/env bash
set -euo pipefail

# Initialize variables and activate virtual environment
source setVars.sh
source venv/bin/activate
flask run
