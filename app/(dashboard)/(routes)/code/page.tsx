'use client';

import axios from 'axios';
import { Code } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from 'openai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Heading } from '@/components/heading';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from './constants';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';

import { useSubscriptionModal } from '@/hooks/use-subscription-modal';


const CodePage = () => {
	const router = useRouter();
	const [messages, setMessages] = useState<
		ChatCompletionRequestMessage[]
	>([]);

	const subscriptionModal = useSubscriptionModal()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (
		values: z.infer<typeof formSchema>
	) => {
		try {
			const userMessage: ChatCompletionRequestMessage = {
				role: 'user',
				content: values.prompt,
			};

			const newMessages = [...messages, userMessage];

			const response = await axios.post('/api/code', {
				messages: newMessages,
			});

			setMessages((current) => [
				...current,
				response.data,
				userMessage,
			]);
		} catch (error: any) {
			if (error?.response?.status === 403) {
				subscriptionModal.onOpen();
			} else {
				toast.error("Something went wrong")
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Code Generation"
				description="Generate code using descriptive text"
				icon={Code}
				iconColor="text-orange-400"
				bgColor="bg-orange-400/10"
			/>

			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border w-full p-4 px-3 md:px-6
                focus-within:shadow-sm grid grid-cols-12 gap-2"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="
                          text-md
                          border-0 
                          outline-none 
                          focus-visible:ring-0 
                          focus-visible:ring-transparent
                        "
												disabled={isLoading}
												placeholder="Code for toggle button in typescript"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								disabled={isLoading}
								className="bg-gray-800 hover:bg-gray-900 col-span-12 
                  lg:col-span-2 w-full"
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>

				<div className="space-y-4 mt-4">
					{isLoading && (
						<div
							className="p-8 rounded-lg w-full flex items-center 
							justify-center bg-muted"
						>
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label="Octo is setting up their IDE \uD83D\uDCBB" />
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									`p-8 w-full flex items-center gap-x-8 rounded-lg`,
									message.role === 'user'
										? 'bg-muted'
										: 'bg-gray-400/40 flex-row-reverse'
								)}
							>
								{message.role === 'user' ? (
									<UserAvatar />
								) : (
									<BotAvatar />
								)}
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div
												className="overflow-auto w-full my-2 bg-black/10 
												p-2 rounded-lg"
											>
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code
												className="bg-black/10 rounded-sm px-2 py-1"
												{...props}
											/>
										),
									}}
									className="text-md overflow-hidden leading-8"
								>
									{message.content ?? ''}
								</ReactMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CodePage;
