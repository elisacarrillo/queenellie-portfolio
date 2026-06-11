---
title: Telegram Bot to Upload My Takes
date: 2026-06-11
---

I just created a telegram bot with BotFather and a vercel webhook route that runs everytime I text the bot. It validates that the request is from telegram, parses my title and content, and calls the GitHub API to open a PR with the new take. The bot then replies to my message with a PR :)
