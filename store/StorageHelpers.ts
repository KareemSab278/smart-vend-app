type OrderItem = {
  id: number | string
  name: string
  price: number
  quantity: number
}

const organiseOrder = (orders: OrderItem[]): OrderItem[] => {
  const combined = orders.reduce<Record<number, OrderItem>>((acc, item) => {
    if (!item || typeof item.id !== 'number') return acc

    const existing = acc[item.id]
    if (existing) {
      acc[item.id] = {
        ...existing,
        quantity: existing.quantity + (item.quantity ?? 0),
      }
    } else {
      acc[item.id] = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity ?? 0,
      }
    }

    return acc
  }, {})

  return Object.values(combined)
}

export { OrderItem, organiseOrder }
