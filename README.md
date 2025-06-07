# Mendel's Genetics Calculator with LCD Display

This Arduino program implements a genetics calculator that demonstrates Mendel's laws of inheritance using an LCD display. The program calculates F1 and F2 generation results for dihybrid crosses.

## Hardware Requirements
- Arduino board
- I2C LCD Display (16x2)
- Push button
- Wiring:
  - LCD: SDA and SCL pins
  - Button: Pin 7

## Program Structure

Please find the wiring for this prototype as following:

![Prototype Wiring](/assets/prototype_wiring.png)

### Key Functions

1. `generatePunnettSquare(String parent1, String parent2, String offspring[16])`
   - Generates all possible combinations of gametes from two parents
   - Creates a 16-slot matrix representing all possible offspring genotypes
   - Sorts alleles to maintain standard format (dominant alleles first)

2. `calculateF2Ratio(String parent1, String parent2)`
   - Calculates the phenotypic ratio for F2 generation
   - Returns ratio in format: A_B_:A_bb:aaB_:aabb
   - Uses the Punnett square results to count phenotypes
   - Simplifies the ratio using GCD

3. `mendelF1Generator(String parent1, String parent2)`
   - Generates F1 offspring genotype from two parent genotypes
   - Takes first allele from each locus of each parent
   - Sorts alleles to maintain standard format (dominant first)

4. `printResults(String parent1, String parent2)`
   - Helper function to print cross results to Serial monitor
   - Shows parent genotypes and resulting F2 ratio

### State System
The program uses a simple state machine with two states:
- State 0: Shows F1 generation results
- State 1: Shows F2 generation results
- State changes are triggered by button press (Pin 7)

### Input System
The program currently uses hardcoded inputs that need to be modified in the `loop()` function.
When doing the RFID implementation, replace these with the inputs from RFID.:

1. For F1 Generation (State 0):
```cpp
String input1 = "AABB";  // First parent genotype
String input2 = "aabb";  // Second parent genotype
```

2. For F2 Generation (State 1):
```cpp
String input3 = "AaBb";  // Second parent genotype for F2
```
