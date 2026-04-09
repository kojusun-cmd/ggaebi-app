from PIL import Image
import math

def remove_background(input_path, output_path, tolerance=40):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()

        # The color at the top-left corner is assumed to be the background color
        bg_r, bg_g, bg_b, _ = pixels[0, 0]

        # Visited array for BFS
        visited = set()
        queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)] # Start from all 4 corners
        
        for q in queue:
            visited.add(q)

        # BFS for flood fill
        head = 0
        while head < len(queue):
            x, y = queue[head]
            head += 1

            r, g, b, a = pixels[x, y]
            
            # Check Euclidean distance
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            if dist <= tolerance:
                # Mark as transparent
                pixels[x, y] = (0, 0, 0, 0)
                
                # Add neighbors
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < width and 0 <= ny < height:
                        if (nx, ny) not in visited:
                            visited.add((nx, ny))
                            queue.append((nx, ny))

        img.save(output_path, "PNG")
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

remove_background("public/goblin_club.png", "public/goblin_club_transparent.png", tolerance=55)
