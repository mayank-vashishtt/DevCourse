# Docker & Containerization — Deep Dive README

## 1. What is Containerization?

* **Definition:** Containerization is a method of packaging applications with all dependencies (code, libraries, runtimes, configs) into isolated, portable units called **containers**.
* **Why Important:** Ensures applications run **exactly the same** across environments (dev laptop → test → production).
* **Analogy:** Like shipping containers that carry goods worldwide without caring about the transport method.

---

## 2. What is a Container?

* A **container** is a lightweight, stand-alone, executable unit of software.
* Shares the host OS kernel but has its own **filesystem, processes, networking**.
* Isolated from other containers.
* Much faster and lighter than VMs.

---

## 3. Why are Containers Useful?

* **Consistency:** No “works on my machine” problem.
* **Efficiency:** Uses fewer resources than VMs.
* **Portability:** Run anywhere (local, server, cloud).
* **Isolation:** Each container runs independently.
* **Scalability:** Easy to clone, run 10s–100s copies.

---

## 4. Why Docker?

* Docker is the most popular container platform.
* Provides:

  * **Docker Engine:** Runs containers.
  * **Docker CLI:** Commands to manage Docker.
  * **Docker Daemon:** Background service.
  * **Docker Registry (Docker Hub, ECR):** Store/distribute images.

---

## 5. Docker Architecture

* **Docker Engine:** Core service that executes containers.
* **Docker CLI:** Interface to run commands.
* **Docker Daemon:** Listens to CLI, manages containers/images.
* **Docker Registry:** Repository of images (Hub, AWS ECR, GCP Artifact Registry).

---

## 6. Image vs Container

* **Image:** A read-only **blueprint** (code + dependencies).
* **Container:** A running instance of an image.
* Analogy: Image = Class, Container = Object.

---

## 7. Dockerfile

* A **Dockerfile** defines how to build an image.
* Two parts:

  1. **Instructions** (FROM, RUN, CMD, ENTRYPOINT, COPY, EXPOSE, ENV).
  2. **Build context** (the directory’s files).

### Example:

```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

### CMD vs RUN vs ENTRYPOINT

* **RUN:** Executes while building image (install packages).
* **CMD:** Default command when container starts (can override).
* **ENTRYPOINT:** Main process that always runs, harder to override.

---

## 8. Common Docker Commands

| Command                               | Explanation                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `docker pull mongo`                   | Download MongoDB image from Docker Hub                  |
| `docker images`                       | List local images                                       |
| `docker run mongo`                    | Run MongoDB container                                   |
| `docker run -d -p 2710:2710 mongo`    | Detached mode, map host port 2710 → container port 2710 |
| `docker ps`                           | List running containers                                 |
| `docker kill <container_id>`          | Stop container immediately                              |
| `docker rmi <image_name>`             | Delete an image                                         |
| `docker build -t <name> .`            | Build image from Dockerfile, tag as `<name>`            |
| `docker exec -it <container_id> bash` | Open interactive shell inside container                 |

---

## 9. Creating & Pushing Image to Docker Hub

1. Build image:

```bash
docker build -t myusername/myapp:latest .
```

2. Login:

```bash
docker login
```

3. Push:

```bash
docker push myusername/myapp:latest
```

---

## 10. Running Containers Locally

* From own image:

```bash
docker run -d -p 8080:8080 myusername/myapp:latest
```

* From public image:

```bash
docker run -d -p 8080:8080 nginx
```

---

## 11. Port Mapping (VERY IMPORTANT)

* **Problem:** Containers have their own internal network. Ports inside container are not visible to outside unless mapped.
* **Solution:** Use `-p host_port:container_port`.
* Example: `-p 8080:80` → host `localhost:8080` forwards to container’s internal port `80`.
* **Analogy:** Like connecting your house address (host port) to a specific apartment door (container port).

---

## 12. Docker Engine, CLI, Daemon & Registry

* **Engine:** Core that runs containers.
* **CLI:** Interface (`docker` command).
* **Daemon:** Service running in background.
* **Registry:** Remote repo storing images.

---

## 13. Deploying on AWS / Kubernetes

* **On AWS EC2:** Install Docker → pull image → run with port mapping.
* **On AWS ECS or Kubernetes:**

  1. Push image to registry (Docker Hub or AWS ECR).
  2. Define ECS Task or K8s Deployment YAML.
  3. Scale & expose service.

---

## 14. Docker Compose

* Tool to run multiple containers with one file.
* Uses `docker-compose.yml`.

### Example:

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
  db:
    image: mongo
    ports:
      - "27017:27017"
```

Run:

```bash
docker-compose up -d
```

---

## 15. .dockerignore

* Prevents unnecessary files from being copied during build.
* Example:

```
*.pyc
__pycache__/
.env
.git
```

---

## 16. Passing Environment Variables

* **Option 1 — CLI:**

```bash
docker run -e ENV=production myapp
```

* **Option 2 — .env file + Docker Compose:**

```env
ENV=production
DB_URL=mongodb://...
```

In `docker-compose.yml`, Compose automatically loads `.env`.

* **Option 3 — Docker Secrets (for prod):** Store env vars securely, not in plain files.

---

## 17. Virtual Machine vs Container

| Virtual Machine                     | Container               |
| ----------------------------------- | ----------------------- |
| Includes full OS kernel             | Shares host OS kernel   |
| Heavy, slow to boot                 | Lightweight, fast       |
| Consumes GBs memory                 | Uses MBs                |
| Stronger isolation (hardware level) | Process-level isolation |

**Analogy:** VM = house (independent, heavy). Container = apartment (shares building, lightweight).

---

## 18. Flow of Docker Running Locally

1. Write app + Dockerfile.
2. Run `docker build` → Docker Daemon creates image.
3. Run `docker run` → CLI talks to Daemon.
4. Daemon launches container from image.
5. App runs in isolated environment.

---

## ✅ Key Takeaways

* Containers = portable, reproducible, lightweight environments.
* **Image = blueprint**, **Container = running instance**.
* **Port mapping** connects outside world to inside container.
* **.env** & secrets help manage sensitive configs.
* Use **Docker Compose** for multi-service apps.
* Use **Kubernetes/ECS** for production scaling.
