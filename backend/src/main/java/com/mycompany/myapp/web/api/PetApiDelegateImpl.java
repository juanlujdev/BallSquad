
package com.mycompany.myapp.web.api;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mycompany.myapp.service.api.dto.Pet;

@Service
public class PetApiDelegateImpl implements PetApiDelegate {

    @Override
    //public ResponseEntity<List<Pet>> findPetsByStatus(List<String> status) {
        //return ResponseEntity.ok(
            //status.stream()
                //.distinct()
                //.map(Pet.StatusEnum::fromValue)
                //.map(statusEnum -> new Pet().id(RandomUtils.nextLong()).status(statusEnum))
                //.collect(Collectors.toList())
        //);
    //}
    public ResponseEntity<Pet> addPet(Pet pet) {
	        System.out.println("RECEIVED");
	        return ResponseEntity.ok().build();
	}
}