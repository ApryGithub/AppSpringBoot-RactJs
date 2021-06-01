/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package repository;

import com.restapi.entities.TbMasterUser;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author macbookpro
 */
public interface UserRepository extends JpaRepository<TbMasterUser, Integer> {
    
    @Override
    List<TbMasterUser> findAll();
    List<TbMasterUser> findByUserId(Integer userId);
    // List<TbMasterUser> findLikeByUserName(String userName); // custome query tidak dengan JPA
    List<TbMasterUser> findByUserNameContaining(String userName); // like tapi case sensitive dengan JPA
    List<TbMasterUser> findByUserNameLike(String userName); // like tapi kaya where dengan JPA
    List<TbMasterUser> findByUserNameIgnoreCaseContaining(String userName); // like tidak case sensitive dengan JPA
}
