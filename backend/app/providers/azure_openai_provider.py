from typing import Dict, Any, List
import os
import asyncio

try:
	from openai import AzureOpenAI  # type: ignore
except Exception:  # noqa: BLE001
	AzureOpenAI = None  # type: ignore


class AzureOpenAIProvider:
	def __init__(self):
		self.endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
		self.api_key = os.getenv("AZURE_OPENAI_API_KEY")
		self.deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4o-mini")
		self.api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-06-01")
		if self.endpoint and self.api_key and AzureOpenAI is not None:
			self.client = AzureOpenAI(
				azure_endpoint=self.endpoint,
				api_key=self.api_key,
				api_version=self.api_version,
			)
		else:
			self.client = None

	async def chat(self, messages: List[Dict[str, str]], temperature: float = 0.7) -> str:
		if not self.client:
			# Fallback mock content when not configured
			return "Let's explore this step by step."

		def _call():
			return self.client.chat.completions.create(
				model=self.deployment, messages=messages, temperature=temperature
			)

		resp = await asyncio.to_thread(_call)
		return resp.choices[0].message.content


azure_openai = AzureOpenAIProvider()
