package com.rhino.repo;

import com.rhino.model.Authority;
import com.rhino.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by user on 04/11/2017.
 */
public interface AuthorityRepository extends JpaRepository<Authority,Long> {

    List<Authority> findAuthoritiesByUsersIn(User user);

    Authority findByName(String name);

}
