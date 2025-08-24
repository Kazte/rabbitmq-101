# 02-workqueues

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.1.42. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Work Queues (aka Task Queues)

- A work queue will be used to distribute time-consuming tasks to multiple workers.

The main idea is to avoid doing a resource-intensive task and having to wait for it to complete.
Instead of it, we schedule a task to be performed later.
When you run many workers, the task will be shared between them.
