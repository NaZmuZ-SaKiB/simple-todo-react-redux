import TodoContainer from "@/components/todo/TodoContainer";
import Container from "@/components/ui/Container";

const Todo = () => {
  return (
    <Container>
      <div className="py-10 flex justify-center">
        <h1 className="text-center bg-primary-gradient inline-block text-3xl font-bold bg-clip-text text-transparent">
          My ToDos
        </h1>
      </div>
      <TodoContainer />
    </Container>
  );
};

export default Todo;
