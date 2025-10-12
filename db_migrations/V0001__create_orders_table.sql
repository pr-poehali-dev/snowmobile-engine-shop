-- Создаем таблицу для хранения заказов
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(255) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    total_items INTEGER NOT NULL,
    order_items JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'новый'
);

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Комментарии к таблице и колонкам
COMMENT ON TABLE orders IS 'Таблица заказов интернет-магазина двигателей';
COMMENT ON COLUMN orders.order_number IS 'Уникальный номер заказа';
COMMENT ON COLUMN orders.order_items IS 'JSON массив товаров в заказе';
COMMENT ON COLUMN orders.status IS 'Статус заказа: новый, в обработке, выполнен, отменен';