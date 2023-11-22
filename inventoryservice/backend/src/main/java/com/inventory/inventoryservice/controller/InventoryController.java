package com.inventory.inventoryservice.controller;


import com.inventory.inventoryservice.model.Inventory;
import com.inventory.inventoryservice.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/inventory")

public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<String> addInventory(@RequestBody Inventory inventory){

        try{
            inventoryService.addInventory(inventory);
            return ResponseEntity.ok("Inventory is added.");
        }
        catch (Exception e){

            return ResponseEntity.badRequest().body("Inventory is not added.");

        }
    }
    


    @GetMapping
    public ResponseEntity<?> searchInventory(@RequestParam(required = false) List<String> brands,@RequestParam(required = false) List<String> types,@RequestParam String description,
    @RequestParam Integer page,@RequestParam Integer limit){

       if(brands.isEmpty() && types.isEmpty() && description.isEmpty()){

           return ResponseEntity.badRequest().body("At least one parameter is required.");
       }

        Pageable pageable = PageRequest.of(page,limit);

       Page<Inventory> searchResults = inventoryService.searchInventory(brands,types,description,pageable);
       return ResponseEntity.ok(searchResults);
    }

    @GetMapping("/find")
    public Optional<Inventory> findInventory(@RequestParam Integer inveId){
      return inventoryService.findInventory(inveId);
    }


    @PutMapping
    public ResponseEntity<String> updateInventory(@RequestBody Inventory inventory,@RequestParam Integer inveId){
        try{
            inventoryService.updateInventory(inventory,inveId);
            return ResponseEntity.ok("Inventory is updated.");
        }
        catch (Exception e){

            return ResponseEntity.badRequest().body("Inventories is not updated.");

        }

    }

    @DeleteMapping
    public ResponseEntity<String> deleteInventory(@RequestParam List<Integer> inveId){

        try{
            inventoryService.deleteInventory(inveId);
            return ResponseEntity.ok("Inventories are deleted.");
        }
        catch (Exception e){

            return ResponseEntity.badRequest().body("Inventories are not deleted.");

        }
    }

}
