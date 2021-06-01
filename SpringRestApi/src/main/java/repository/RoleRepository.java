/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository;

import com.restapi.entities.TbMasterUserRole;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author macbookpro
 */
public interface RoleRepository extends JpaRepository<TbMasterUserRole, Integer> {
    
    @Override
    List<TbMasterUserRole> findAll();
    List<TbMasterUserRole> findByRoleId(Integer roleId);
}

// public interface RoleRepository extends JpaRepository<EntityRoleUSer, Integer> {}
