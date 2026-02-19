from typing import Callable, List, Tuple
import random

class PSO:
    def __init__(self, dim: int, bounds: List[Tuple[float,float]], seed: int, particles: int, w: float, c1: float, c2: float):
        self.dim = dim
        self.bounds = bounds
        self.rng = random.Random(seed)
        self.n = particles
        self.w = w
        self.c1 = c1
        self.c2 = c2

        self.x, self.v, self.pbest, self.pbest_val = [], [], [], []
        for _ in range(self.n):
            xi = [self.rng.uniform(lo, hi) for lo, hi in bounds]
            vi = [self.rng.uniform(-abs(hi-lo), abs(hi-lo))*0.1 for lo, hi in bounds]
            self.x.append(xi); self.v.append(vi)
            self.pbest.append(list(xi)); self.pbest_val.append(float("inf"))

        self.gbest = list(self.x[0])
        self.gbest_val = float("inf")

    def step(self, f: Callable[[List[float]], float]):
        for i in range(self.n):
            val = f(self.x[i])
            if val < self.pbest_val[i]:
                self.pbest_val[i] = val
                self.pbest[i] = list(self.x[i])
            if val < self.gbest_val:
                self.gbest_val = val
                self.gbest = list(self.x[i])

        for i in range(self.n):
            for d in range(self.dim):
                r1 = self.rng.random()
                r2 = self.rng.random()
                self.v[i][d] = (self.w*self.v[i][d] +
                                self.c1*r1*(self.pbest[i][d]-self.x[i][d]) +
                                self.c2*r2*(self.gbest[d]-self.x[i][d]))
                self.x[i][d] += self.v[i][d]
                lo, hi = self.bounds[d]
                if self.x[i][d] < lo:
                    self.x[i][d] = lo
                    self.v[i][d] *= -0.3
                if self.x[i][d] > hi:
                    self.x[i][d] = hi
                    self.v[i][d] *= -0.3
