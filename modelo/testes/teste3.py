import gurobipy as gp 
from gurobipy import GRB

m = gp.Model("mp1")

x1 = m.addVar(vtype=GRB.INTEGER, name="x1")
x2 = m.addVar(vtype=GRB.INTEGER, name="x2")

newArray = []

for item in [x1,x2]:
    newArray.append(item/2)

m.setObjective(sum(newArray), GRB.MINIMIZE)

m.addConstr(7*x1-2*x2 >=14, "c0")

m.optimize()
print(f"Optimal objective value: {m.objVal}")
print(f"Solution values: x1={x1.X}, x2={x2.X}")
