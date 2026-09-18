## Bootstrap (runs in every new session)

This is an ephemeral cloud container: the repository is cloned fresh each
session, so anything not in git is gone. The graphify skill, its rules and its
hooks are committed, but the CLI itself is not. At the start of a session, if
`graphify` is missing, install it before using the skill:

```bash
command -v graphify >/dev/null || uv tool install graphifyy
```

The tool-call hooks are written to no-op while the CLI is absent, so a session
never blocks on this.

## Working preferences

- **Font colour follows the piece.** Pick caption and title colours from the
  video's own palette, never a default accent. One coherent line beats a warm
  and a cold accent competing in the same frame.
- **Instagram posts go to @slyshal74** unless told otherwise.
- Answer briefly; ask before doing something substantial.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
