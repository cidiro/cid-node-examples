from .nodes.any_type_example import AnyTypeExample
from .nodes.dynamic_inputs_example import DynamicInputsExample

WEB_DIRECTORY = "./js"

NODE_CLASS_MAPPINGS = {
    "AnyTypeExample": AnyTypeExample,
    "DynamicInputsExample": DynamicInputsExample
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AnyTypeExample": "Any Type Example",
    "DynamicInputsExample": "Dynamic Inputs Example"
}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
