def remove_duplicates_sort_integers(input_file, output_file):
  """
  Reads an input file with integers on each line, removes duplicates, sorts
  the unique integers, and writes them to a new file. Skips lines with invalid
  data (empty lines, multiple integers, non-integers).

  Args:
    input_file: Path to the input file.
    output_file: Path to the output file.
  """
  seen = set()  # Use a set to store unique integers

  with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
    for line in infile:
      # Remove leading/trailing whitespace (tabs and spaces)
      line = line.strip()

      # Skip empty lines
      if not line:
        continue

      try:
        
        integer = int(line)
      except ValueError:
    
        continue

      
      if len(line.split()) > 1:
        continue

      
      if integer not in seen:
        seen.add(integer)
        outfile.write(str(integer) + '\n')

  
  seen = sorted(seen)

  