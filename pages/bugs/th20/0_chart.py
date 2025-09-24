import numpy as np
import matplotlib.pyplot as plt
import os
from matplotlib.ticker import StrMethodFormatter

def truncate_to_nearest_ten(x):
    return (x // 10) * 10

# simulate 32-bit signed overflow
def bugged_score(piv):
    product = (piv * 10000) & 0xFFFFFFFF
    if product & 0x80000000:
        product -= 0x100000000
    score = product // 5000 + 10000 // 2
    score = truncate_to_nearest_ten(score)
    if score <= 0:
        score = 10
    return score

def intended_score(piv):
    score = 2 * piv + 5000
    score = truncate_to_nearest_ten(score)
    if score <= 0:
        score = 10
    return score

# internal PIV values
piv_values = np.arange(0, 1000000, 100)  # step of 100 for smooth curve

#convert to displayed piv
piv_display = piv_values / 5000

bugged_scores = [bugged_score(p) for p in piv_values]
intended_scores = [intended_score(p) for p in piv_values]

plt.style.use('dark_background')
plt.rcParams.update({
    'text.usetex': True,
    'font.family': 'serif',
    'font.serif': 'Computer Modern',
    'font.size': 12
})

plt.figure(figsize=(12, 6))
plt.plot(piv_display, intended_scores, label="Intended (2 * piv + 5000)", linewidth=2, color="cyan")
plt.plot(piv_display, bugged_scores, label="Bugged (signed 32-bit integer overflow)", linewidth=2, linestyle="--", color="orange")

plt.xlabel("Point Item Value (displayed value)")
plt.ylabel("Point Item Score at Max Value")
plt.title("Touhou 20: Intended PIV vs Bugged PIV")
plt.legend()
plt.grid(True)

# remove scientific notation
plt.gca().xaxis.set_major_formatter(StrMethodFormatter("{x:,.1f}"))
plt.gca().yaxis.set_major_formatter(StrMethodFormatter("{x:,.0f}"))

plt.gcf().text(
    0.5, 0.5, "By Nylilsa: nylilsa.github.io",
    fontsize=20, color="gray", alpha=0.20,
    ha="center", va="bottom", rotation=0
)

output_file = os.path.join(os.path.dirname(__file__), "0_piv_overflow_plot.png")
plt.savefig(output_file, dpi=150)

print(f"Plot saved as {output_file}")
