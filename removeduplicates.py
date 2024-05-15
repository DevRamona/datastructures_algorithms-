def remove_duplicates(input_file, output_file):
  """
  Reads an input file with integers on each line, removes duplicates, sorts
  the unique integers, and writes them to a new file. Skips lines with invalid
  data (empty lines, multiple integers, non-integers).

  Args:
      input_file: Path to the input file.
      output_file: Path to the output file.
  """
  unique_integers = set()

  with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
    for line in infile:
      line = line.strip()

      if not line:
        continue

      try:
        integer = int(line)
        unique_integers.add(integer)
      except ValueError:
        continue

  # Sort the set of unique integers before writing
  sorted_integers = sorted(unique_integers)
  
  for integer in sorted_integers:
    outfile.write(str(integer) + '\n')

# Example usage
input_file = 'input.txt'
output_file = 'unique_sorted.txt'
remove_duplicates(input_file, output_file)
