# Cunico.Net
Version with Hugo

## Requirements:
- hugo (with SCSS/SASS support)
    - Ubuntu:
        ```[bash]
        snap install hugo --channel=extended
        ```
    - Windows (chocolatey)
        ```[powershell]
        choco install hugo-extended
        ```


## Setup:

1. Download the submodules:

    ```[bash]
    git submodule update --init
    ```

2. Build website. The results of build will be placed in `public/`


    ```[bash]
    hugo
    ```

3. (opt.) Run server for local dev


    ```[bash]
    hugo server -D
    ```