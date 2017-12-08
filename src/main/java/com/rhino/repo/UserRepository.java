package com.rhino.repo;

import com.rhino.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created by user on 04/11/2017.
 */
public interface UserRepository extends PagingAndSortingRepository<User,Long> {
    User findByUsername(String username);
    List<User> findAll();
    Optional<User> getOne(Long id);
    User findByEmail(String email);
}
