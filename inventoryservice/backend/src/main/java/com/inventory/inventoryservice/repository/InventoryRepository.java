package com.inventory.inventoryservice.repository;

import com.inventory.inventoryservice.model.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory,Integer> {

//    @Query(value = "FROM Inventory i WHERE (:brands IS NULL OR i.brand IN (:brands)) AND (:types IS NULL OR i.type IN (:types)) AND (:description IS NULL OR i.description LIKE %:description%)")
//    @Query(value = "FROM Inventory i WHERE (COALESCE(:brands, NULL) IS NULL OR SIZE(:brands) = 0 OR i.brand IN (:brands)) AND (COALESCE(:types, NULL) IS NULL OR SIZE(:types) = 0 OR i.type IN (:types)) AND (:description IS NULL OR i.description LIKE %:description%)")
    @Query(value = "SELECT * FROM Inventory i WHERE (IFNULL(:brands, '') = '' OR i.brand IN (:brands)) AND (IFNULL(:types, '') = '' OR i.type IN (:types)) AND (IFNULL(:description, '') = '' OR i.description LIKE %:description%)", nativeQuery = true)
    public Page<Inventory> searchInventory(@Param("brands") List<String> brands, @Param("types") List<String> types, @Param("description") String description,Pageable pageable);


}
