# ⚖️ NyaySahayak — Intelligent Legal Search Platform

> A rule-based legal search engine for exploring and cross-referencing provisions of the **Indian Penal Code (IPC)** and the **Bharatiya Nyaya Sanhita (BNS)**.

NyaySahayak is a web-based legal search platform designed to simplify the transition from the Indian Penal Code (IPC) to the Bharatiya Nyaya Sanhita (BNS).

The platform allows users to search legal provisions using **IPC section numbers, BNS section numbers, offence names, keywords, aliases, and loosely phrased queries**. Instead of relying only on exact text matching, NyaySahayak uses a custom multi-tier rule-based ranking system to identify and prioritize the most relevant legal provisions.

---

## 🚀 Live Demo

🌐 **Live Application:**  
[Add your Vercel deployment link here]

> The frontend is deployed using Vercel, while the backend is hosted separately.

---

## 📌 Problem Statement

The introduction of the **Bharatiya Nyaya Sanhita (BNS)** replaced the long-standing Indian Penal Code (IPC), resulting in significant changes to section numbering and the structure of several offences.

For students, legal professionals, law-enforcement personnel, and ordinary citizens, finding the corresponding provision between IPC and BNS can be difficult.

Traditional section-by-section lookup systems also become less useful when users do not know the exact section number.

For example, a user may search:

- `302`
- `BNS 103`
- `murder`
- `theft`
- `stolen property`
- `someone stole my phone`

NyaySahayak is designed to handle these different styles of queries through a structured legal dataset and rule-based search engine.

---

## 🎯 Objectives

The main objectives of NyaySahayak are:

- 🔎 Provide fast legal provision search
- 🔄 Enable IPC ↔ BNS cross-referencing
- 🧠 Support keyword and alias-based searching
- 📚 Maintain a structured legal dataset
- 🎯 Rank results according to relevance
- 🌐 Provide a simple and responsive web interface
- 🔌 Expose the search engine through REST APIs
- 🏗️ Create a scalable foundation for future AI-powered legal assistance

---

# ✨ Key Features

### 1. IPC Section Search

Users can directly search using IPC section numbers.

Example:

```text
302
