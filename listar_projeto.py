import os

IGNORADOS = {"node_modules", ".git", "__pycache__", ".next"}  # Pastas a serem ignoradas

def listar_estrutura(diretorio, nivel=0):
    """Lista as pastas e arquivos do projeto em formato de árvore, ignorando pastas específicas."""
    try:
        itens = sorted(
            [item for item in os.listdir(diretorio) if item not in IGNORADOS]
        )
    except PermissionError:
        return  # Ignorar diretórios sem permissão de leitura

    for i, item in enumerate(itens):
        caminho_completo = os.path.join(diretorio, item)
        prefixo = "├── " if i < len(itens) - 1 else "└── "

        print("    " * nivel + prefixo + item)

        if os.path.isdir(caminho_completo):
            listar_estrutura(caminho_completo, nivel + 1)

if __name__ == "__main__":
    raiz = os.path.dirname(os.path.abspath(__file__))
    print(f"📂 Estrutura do projeto: {os.path.basename(raiz)}\n")
    listar_estrutura(raiz)
