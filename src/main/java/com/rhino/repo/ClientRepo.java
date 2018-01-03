package com.rhino.repo;

import com.rhino.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by user on 16/12/2017.
 */
public interface ClientRepo extends JpaRepository<Client,Long> {

    List<Client> findClientByClientNameLike(String searchStr);
    List<Client> findClientsByClientNameIgnoreCaseContaining(String searchStr);

    Client findClientByPin(String pin);
}
