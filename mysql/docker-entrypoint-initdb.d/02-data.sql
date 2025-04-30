-- mysql/docker-entrypoint-initdb.d/02-data.sql
-- Room Types
INSERT IGNORE INTO room_types (name, base_price, description) VALUES
  ('Standard', 100.00, '1 queen bed, basic amenities'),
  ('Deluxe', 200.00, '1 king bed, premium view'),
  ('Suite', 350.00, 'Separate living area, jacuzzi');

