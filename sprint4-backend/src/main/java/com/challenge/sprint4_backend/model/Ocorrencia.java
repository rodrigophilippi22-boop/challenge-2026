package com.challenge.sprint4_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "ocorrencias")
public class Ocorrencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String tipoRisco;

    @NotBlank
    @Column(length = 1000)
    private String descricao;

    @NotBlank
    private String local;

    private LocalDateTime dataRegistro;

    public Ocorrencia() {
    }

    @PrePersist
    public void antesDeSalvar() {
        if (dataRegistro == null) {
            dataRegistro = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public String getTipoRisco() {
        return tipoRisco;
    }

    public void setTipoRisco(String tipoRisco) {
        this.tipoRisco = tipoRisco;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }
}
