# OS Scheduler

This project is an OS Scheduler that implements various scheduling algorithms. The application allows users to simulate and visualize different scheduling strategies.

# OS Scheduling Algorithms

This is a [Next.js](https://nextjs.org) project that visualizes various OS scheduling algorithms. The project is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Algorithms](#algorithms)
- [Installation](#installation)
- [Usage](#usage)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

## Folder Structure
The project has the following structure:
```
.gitignore
.next/
    app-build-manifest.json
    build-manifest.json
    cache/
        .rscinfo
        swc/
        webpack/
    [package.json](http://_vscodecontentref_/1)
    react-loadable-manifest.json
    server/
        app/
        app-paths-manifest.json
        interception-route-rewrite-manifest.js
        ...
    static/
    trace
    types/
app/
    (pages)/
    fonts/
    globals.css
    [layout.tsx](http://_vscodecontentref_/2)
components/
    shared/
    ui/
[components.json](http://_vscodecontentref_/3)
lib/
    [context.tsx](http://_vscodecontentref_/4)
    types.ts
    utils.ts
[next-env.d.ts](http://_vscodecontentref_/5)
[next.config.ts](http://_vscodecontentref_/6)
[package.json](http://_vscodecontentref_/7)
[postcss.config.mjs](http://_vscodecontentref_/8)
public/
[README.md](http://_vscodecontentref_/9)
[tailwind.config.ts](http://_vscodecontentref_/10)
[tsconfig.json](http://_vscodecontentref_/11)

```

## Algorithms
This project visualizes the following OS scheduling algorithms:

Round Robin: A pre-emptive algorithm where each process is assigned a fixed time slot in a cyclic order.
First-Come, First-Served (FCFS): A non-preemptive algorithm where the process that arrives first is executed first.
Shortest Job Next (SJN): A non-preemptive algorithm that selects the process with the smallest execution time.
Priority Scheduling: A non-preemptive algorithm where each process is assigned a priority, and the process with the highest priority is executed first.

## Installation
You can install the OS Scheduler either by cloning the repository or by downloading the zip file.

### Cloning the Repository
1. Open your terminal.
2. Clone the repository:
    ```sh
    git clone https://github.com/your-username/os-scheduler.git
    ```
3. Navigate to the project directory:
    ```sh
    cd os-scheduler
    ```
4. Install the required dependencies:
    ```
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Downloading the Zip File
1. Download the zip file from the repository.
2. Extract the zip file to your desired location.
3. Navigate to the project directory:
    ```sh
    cd os-scheduler
    ```
4. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

### Using Zip File
    1. Download the zip file from the repository.
    2. Extract the zip file.
    3. Navigate to the extracted directory.
    4. Install the dependencies:
    ```
        npm install
        # or
        yarn install
        # or
        pnpm install
    ```
## Usage
    To start the development server, run:
    ```
        npm run dev
        # or
        yarn dev
        # or
        pnpm dev
        # or
        bun dev
    ```

    Open http://localhost:3000 with your browser to see the result.