# 02-workqueues

To install dependencies:

```bash
bun install
```

To run:

You should run as many as workers you want to instance:
```bash
bun worker
```
and then send messages to the queue:
After the message insert dots (.) to simulate more time


```bash
bun new_task MyMessage

bun new_task MyMessage2..
```

## Work Queues (aka Task Queues)

- A work queue will be used to distribute time-consuming tasks to multiple workers.

The main idea is to avoid doing a resource-intensive task and having to wait for it to complete.
Instead of it, we schedule a task to be performed later.
When you run many workers, the task will be shared between them.
