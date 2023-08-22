package addressbook.controller;

import addressbook.model.AddressBook;
import addressbook.repository.AddressBookRepository;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin
@RestController
@RequestMapping("/addresses")
public class AddressBookController {
    private final AddressBookRepository repository;

    public AddressBookController(AddressBookRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<AddressBook>> getAllCustomers () {
        return ResponseEntity.ok(this.repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<AddressBook>> getCustomer (@PathVariable("id") Long id) {
        return ResponseEntity.ok(repository.findById(id));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AddressBook create(@Valid @RequestBody AddressBook contact) {
        return repository.save(contact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressBook> update (@Valid @RequestBody AddressBook contact, @PathVariable Long id) {
        AddressBook contactToUpdate = this.repository.findById(id).get();
        contactToUpdate.setName(contact.getName());
        contactToUpdate.setEmail(contact.getEmail());
        contactToUpdate.setPhone(contact.getPhone());
        contactToUpdate.setAddress(contact.getAddress());
        return ResponseEntity.ok(this.repository.save(contactToUpdate));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
