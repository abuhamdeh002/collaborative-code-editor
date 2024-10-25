package com.example.collaborativeeditor.repository;

import com.example.collaborativeeditor.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}