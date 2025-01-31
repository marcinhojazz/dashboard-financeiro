import { Card, Text, Flex } from "@radix-ui/themes";

export default function SummaryCards() {
  return (
    <Flex gap="4" justify="center" wrap="wrap">
      <Card size="3">
        <Text size="4">📥 Receitas</Text>
        <Text size="5" color="green">
          R$ 10.000
        </Text>
      </Card>
      <Card size="3">
        <Text size="4">📤 Despesas</Text>
        <Text size="5" color="red">
          R$ 5.500
        </Text>
      </Card>
      <Card size="3">
        <Text size="4">⏳ Pendentes</Text>
        <Text size="5" color="orange">
          R$ 2.000
        </Text>
      </Card>
      <Card size="3">
        <Text size="4">💰 Saldo Total</Text>
        <Text size="5" color="blue">
          R$ 4.500
        </Text>
      </Card>
    </Flex>
  );
}
