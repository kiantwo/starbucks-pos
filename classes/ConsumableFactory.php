<?php
declare(strict_types=1);

class ConsumableFactory {
    public function createConsumable(array $item): IConsumable {
        switch($item['type']) {
            case '110': return new Coffee($item['id'], $item['name'], $item['image'], $item['size'], $item['price'], $item['qty']);
            case '111': return new Frappe($item['id'], $item['name'], $item['image'], $item['size'], $item['price'], $item['qty']);
            case '112': return new Tea($item['id'], $item['name'], $item['image'], $item['price'], $item['qty']);
            case '120': return new Cake($item['id'], $item['name'], $item['image'], $item['price'], $item['qty']);
            case '121': return new Wrap($item['id'], $item['name'], $item['image'], $item['price'], $item['qty']);
            case '122': return new HealthyOptions($item['id'], $item['name'], $item['image'], $item['price'], $item['qty']);
        }
    }
}