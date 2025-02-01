import json

# ✅ Caminho do arquivo JSON
file_path = "public/data/transactions.json"  # Ajuste o caminho conforme necessário

# ✅ Ler o arquivo JSON
with open(file_path, "r", encoding="utf-8") as file:
    transactions = json.load(file)

# ✅ Extrair todas as contas e remover duplicatas
unique_accounts = sorted(set(transaction["account"] for transaction in transactions))

# ✅ Exibir a lista final de contas únicas
print(unique_accounts)
