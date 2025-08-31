from typing import List, Dict, Any
from config import settings

# Optional imports guarded at runtime
try:
    import chromadb  # type: ignore
    from chromadb.config import Settings as ChromaSettings  # type: ignore
except Exception:  # noqa: BLE001
    chromadb = None
    ChromaSettings = None
    

try:
    from azure.core.credentials import AzureKeyCredential  # type: ignore
    from azure.search.documents import SearchClient  # type: ignore
except Exception:  # noqa: BLE001
    AzureKeyCredential = None
    SearchClient = None


class VectorStore:
    def __init__(self):
        self.kind = settings.VECTOR_STORE_TYPE
        self.chroma = None
        self.chroma_collection = None
        self.search_client = None

        if self.kind == "chroma" and chromadb is not None:
            client = chromadb.PersistentClient(
                path=settings.CHROMA_PERSIST_DIR,
                settings=ChromaSettings(allow_reset=False),
            )
            self.chroma = client
            embed = None
            try:
                import importlib  # noqa: WPS433
                ef_mod = importlib.import_module("chromadb.utils.embedding_functions")
                SentenceTransformerEmbeddingFunction = getattr(ef_mod, "SentenceTransformerEmbeddingFunction", None)
                if SentenceTransformerEmbeddingFunction is not None:
                    embed = SentenceTransformerEmbeddingFunction(model_name=settings.CHROMA_EMBEDDING_MODEL)
            except Exception:
                embed = None
            self.chroma_collection = client.get_or_create_collection(
                settings.CHROMA_COLLECTION,
                embedding_function=embed,
            )
        elif self.kind == "azuresearch" and AzureKeyCredential and SearchClient and settings.AZURE_SEARCH_ENDPOINT and settings.AZURE_SEARCH_INDEX and settings.AZURE_SEARCH_KEY:
            self.search_client = SearchClient(
                endpoint=settings.AZURE_SEARCH_ENDPOINT,
                index_name=settings.AZURE_SEARCH_INDEX,
                credential=AzureKeyCredential(settings.AZURE_SEARCH_KEY),
            )
        else:
            self.kind = "stub"

    async def retrieve(self, query: str, k: int = 5) -> List[Dict[str, Any]]:
        if self.kind == "chroma" and self.chroma_collection is not None:
            res = self.chroma_collection.query(query_texts=[query], n_results=k, include=["metadatas", "documents", "distances"])
            out: List[Dict[str, Any]] = []
            for i in range(len(res.get("ids", [[]])[0])):
                meta = (res.get("metadatas", [[]])[0][i]) or {}
                doc = (res.get("documents", [[]])[0][i]) or ""
                dist = (res.get("distances", [[]])[0][i]) or None
                out.append({
                    "id": meta.get("id") or f"doc-{i}",
                    "title": meta.get("title") or "",
                    "url": meta.get("url") or "",
                    "snippet": doc[:280],
                    "score": float(1.0 / (1.0 + (dist or 0.0))) if dist is not None else None,
                    "metadata": meta,
                })
            return out
        if self.kind == "azuresearch" and self.search_client is not None:
            results = self.search_client.search(search_text=query, top=k)
            out: List[Dict[str, Any]] = []
            for r in results:
                out.append({
                    "id": getattr(r, "id", None) or getattr(r, "@search.documentId", None),
                    "title": getattr(r, "title", ""),
                    "url": getattr(r, "url", ""),
                    "snippet": getattr(r, "content", "")[:280],
                    "score": getattr(r, "@search.score", None),
                    "metadata": {k: getattr(r, k) for k in dir(r) if not k.startswith("_")},
                })
            return out

        # Stub retrieval
        return [{
            "id": "doc-1",
            "title": "Intro",
            "url": "https://example.com/intro",
            "snippet": "...",
            "score": 0.8,
            "metadata": {}
        }]


vector_store = VectorStore()
