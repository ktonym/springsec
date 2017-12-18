package com.rhino.model;

import javax.json.JsonObjectBuilder;
import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;

/**
 * Created by user on 16/12/2017.
 */
@Entity
//@Data
//@NoArgsConstructor
public class Client extends AbstractEntity implements JsonItem{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long clientId;
    @Column(nullable = false)
    private String clientName;
    @Column(nullable = false, unique = true)
    private String pin;
    @Convert(converter = LocalDatePersistenceConverter.class)
    private LocalDate joinDate;
    @Version
    //@Convert(converter = LocalDateTimePersistenceConverter.class)
    private Timestamp version;

    public Client() {
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    @Override
    public void addJson(JsonObjectBuilder builder) {
        builder.add("clientId", clientId)
                .add("clientName", clientName)
                .add("pin", pin)
                .add("joinDate", joinDate == null ? "" : DATE_FORMATTER_yyyyMMdd.format(joinDate));
    }
}
