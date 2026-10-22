
package com.challenge.sprint4_backend.repository;

import com.challenge.sprint4_backend.model.Ocorrencia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
}
