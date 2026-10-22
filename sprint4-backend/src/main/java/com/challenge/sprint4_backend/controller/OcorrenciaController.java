
package com.challenge.sprint4_backend.controller;

import com.challenge.sprint4_backend.model.Ocorrencia;
import com.challenge.sprint4_backend.repository.OcorrenciaRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ocorrencias")
@CrossOrigin(origins = "*")
public class OcorrenciaController {

    private final OcorrenciaRepository repository;

    public OcorrenciaController(OcorrenciaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Ocorrencia> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ocorrencia> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ocorrencia> criar(@Valid @RequestBody Ocorrencia ocorrencia) {
        ocorrencia.setDataRegistro(null);
        Ocorrencia salva = repository.save(ocorrencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ocorrencia> atualizar(
            @PathVariable Long id, @Valid @RequestBody Ocorrencia dados) {
        return repository.findById(id).map(existente -> {
            existente.setTipoRisco(dados.getTipoRisco());
            existente.setDescricao(dados.getDescricao());
            existente.setLocal(dados.getLocal());
            return ResponseEntity.ok(repository.save(existente));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
