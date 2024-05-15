def remove_duplicates(input_file, output_file):
  """
  Reads an input file with integers on each line, removes duplicates, sorts
  the unique integers, and writes them to a new file. Skips lines with invalid
  data (empty lines, multiple integers, non-integers).

  Args:
    input_file: Path to the input file.
    output_file: Path to the output file.
  """
  seen = {}  

  with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
    for line in infile:
    
      line = line.strip()

      
      if not line:
        continue

      try:
        
        integer = int(line)
      except ValueError:
        
        continue

      
      if len(line.split()) > 1:
        continue

      
      if integer not in seen:
        seen[integer] = True  


  for i in range(len(seen)):
    for j in range(i + 1, len(seen)):
      if list(seen.keys())[i] > list(seen.keys())[j]:
        temp = list(seen.keys())[i]
        list(seen.keys())[i] = list(seen.keys())[j]
        list(seen.keys())[j] = temp

  
  for key in seen:
    outfile.write(str(key) + '\n')

# Example usage
input_file = 'input.txt'
output_file = 'unique_sorted.txt'
remove_duplicates(input_file, output_file)
