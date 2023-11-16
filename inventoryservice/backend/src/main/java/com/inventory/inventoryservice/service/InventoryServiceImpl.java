package com.inventory.inventoryservice.service;

import com.inventory.inventoryservice.model.Inventory;
import com.inventory.inventoryservice.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryServiceImpl implements  InventoryService{

    @Autowired
    private InventoryRepository inventoryRepository;

    public Inventory addInventory(Inventory inventory){

        return inventoryRepository.save(inventory);
    }

    @Override
    public Page<Inventory> searchInventory(List<String> brands, List<String> types, String description,Pageable pageable){

        return inventoryRepository.searchInventory(brands, types, description,pageable);
    }

    @Override
    public void updateInventory(Inventory inventory,Integer inveId){

        Optional<Inventory> inventory1 = inventoryRepository.findById(inveId);

        Inventory inventory2 = inventory1.get();
        inventory2.setBrand(inventory.getBrand());
        inventory2.setType(inventory.getType());
        inventory2.setPrice(inventory.getPrice());
        inventory2.setDate(inventory.getDate());
        inventory2.setDescription(inventory.getDescription());
        inventoryRepository.save(inventory2);
    }

    @Override
    public void deleteInventory(List<Integer> inveId) {

        inventoryRepository.deleteAllById(inveId);
    }
}
