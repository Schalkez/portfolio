---
title: "From a 1 Million VND 'Tuition Fee' on GCP to Learning AWS from First Principles"
description: "The painful lesson that stopped my reckless click-ops habit and pushed me back to first principles when learning AWS."
pubDate: "2025-12-06"
published: true
shortDescription: "The cloud is not your localhost. I choose to understand architecture and fundamentals before typing the first command."
tags:
  - AWS
  - cloud
  - first principles
  - learning
  - architecture
pairSlug:
  vi: aws-first-principles
---

# From a 1 Million VND "Tuition Fee" on GCP to Learning AWS from First Principles

> Topic: Why I chose to master AWS theory before touching the console  
> Author: A dev whose hands used to outrun his brain

---

## 1. The million-dong click and the longest 12 hours of my cloud career

I never thought my AWS story would begin with Google Cloud (GCP), but that is where I learned the most expensive lesson in cloud computing.

On that project I had to ship a simple Cloud Function. Confident in my backend skills, I deployed, triggered it... and went to sleep. What I didn’t know: I had just created an infinite trigger loop. The Function ran the entire night. When I woke up, my inbox screamed billing alerts—roughly 1,000,000 VND gone.

One million might be trivial to others. To me back then, it was a painful price for carelessness. On localhost a buggy loop only freezes my machine; kill the process and move on. In the cloud, architecture mistakes burn real money and real infrastructure.

So when I decided to pick up AWS, I swore I would not “click first, think later” ever again. I would learn AWS through first principles—understand the fundamentals before typing a single command.

## 2. Why first principles?

First principles thinking means stripping a problem down to its most basic truths and rebuilding knowledge from there.

My old learning style was top-down: want to deploy a site → search a tutorial → copy-paste → if it works, done. Fast, but hollow. It’s like picking paint colors without knowing how deep the foundation is.

With AWS I treat click-ops as the visible tip of an iceberg. The real 90%—the stuff that keeps systems resilient, secure, and cost-aware—lives in the invisible infrastructure theory beneath it.

## 3. The study map: what I mastered before launching my first EC2

Instead of spinning up instances on day one, I spent time reading and sketching core concepts:

### A. Global infrastructure: understanding “distance”

- **Region vs. Availability Zone:** I used to think AZs were just logical names. Now I know each AZ is a physically isolated data center cluster to survive disasters.
- **Latency & cost:** data traveling between AZs costs time and money. High availability always means paying for a multi-AZ design.

### B. Networking & IAM: the price of safety

- **VPC (Virtual Private Cloud):** I drew the network on paper—public subnets, private subnets, why a NAT Gateway exists, how packets flow through that maze.
- **IAM (Identity and Access Management):** the bouncer of every service. I drilled the principle of least privilege. Had I enforced better quotas and roles back on GCP, that loop would have died early.

### C. Compute & storage: picking the right tool

- **Compute:** I clearly separated when to use EC2 (virtual machines) and when to use Lambda (serverless). The GCP story taught me that serverless is powerful, but uncontrolled triggers are money bonfires.
- **Storage:** I learned why block storage (EBS) differs from object storage (S3), so I won’t ever treat S3 like a database disk again.

## 4. Learning method: slow, deliberate, repeatable

My main production work still lives on GCP, so I learn AWS through simulations:

- **Billing alarms first:** the moment I open a fresh AWS account, I configure “scream at me when cost > $5.” The tuition fee scar runs deep.
- **Mental modeling:** I challenge myself: “If I mirrored our current system from GCP to AWS, which services map together? How do requests flow?” If I cannot sketch it, I don’t understand it yet.
- **Reading whitepapers:** instead of “deploy in 5 minutes” videos, I devour the AWS Well-Architected Framework. Dry, yes. But it trains the right architectural reflexes.

## 5. Moving from theory to practice: a sandbox with intent

Once the fundamentals felt solid, I started coding—but with structure:

1. Create a dedicated sandbox account, isolated from production.
2. Write detailed playbooks for each exercise (e.g., build a 3-tier VPC, deploy a stateless app).
3. After every step, review the architecture: “If this component dies, how do I scale? Where is logging? What alarms fire?”

## 6. A practical example: rebuild an old system—with a wildly different bill

I recreated the architecture of a previous product:

- An application load balancer across multiple AZs.
- Stateless EC2 instances in an Auto Scaling group; the database (Aurora) running multi-AZ.
- Lambda for asynchronous jobs, fenced by clear IAM roles, observed through CloudWatch alarms.

Because I had already studied networking, IAM, and cost optimization, I avoided leaving security groups wide open or letting a Lambda trigger loop burn the budget. The projected cost delta versus my old “hands faster than brain” approach was night and day.

## 7. Closing thoughts

Yes, this learning path looks “theoretical.” Plenty of folks believe hacking first and fixing later is the fastest way to learn. Maybe for them. But after paying literal cash for ignorance, I deliberately slowed down.

AWS—or any cloud—may rename tools or repaint consoles, yet the underlying principles stay the same. Master them, and you graduate from service assembler to true engineer, fully aware of impact and risk.

Don’t wait for the billing alarm to teach you how your system really works. Trust me: that panic is not something you want to feel twice.

---

_Sharing from someone who is re-entering AWS with maximum caution._

